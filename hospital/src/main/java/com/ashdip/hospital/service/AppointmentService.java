package com.ashdip.hospital.service;

import com.ashdip.hospital.dto.AppointmentDTO;
import com.ashdip.hospital.entity.Appointment;
import com.ashdip.hospital.entity.Doctor;
import com.ashdip.hospital.mapper.PatientMapper;
import com.ashdip.hospital.repository.AppointmentRepo;
import com.ashdip.hospital.repository.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepo appointmentRepository;

    @Autowired
    private DoctorRepo doctorRepository;

    public AppointmentDTO saveAppointment(AppointmentDTO dto) {
        Appointment appointment = new Appointment();

        appointment.setId(dto.getId());

        // Parse "13-07-2025 2:30PM" format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy h:mma");
        appointment.setAppointmentTime(LocalDateTime.parse(dto.getDate(), formatter));

        appointment.setPatientName(dto.getPatientName());  // ✅ Set patient name

        Optional<Doctor> doctorOpt = doctorRepository.findById(dto.getDoctorId());
        doctorOpt.ifPresent(appointment::setDoctor);

        Appointment saved = appointmentRepository.save(appointment);

        AppointmentDTO result = new AppointmentDTO();
        result.setId(saved.getId());
        result.setDate(saved.getAppointmentTime().format(formatter));
        result.setDoctorId(saved.getDoctor() != null ? saved.getDoctor().getId() : null);
        result.setPatientName(saved.getPatientName());  // ✅ Return patient name

        return result;
    }


    public List<AppointmentDTO> getAllAppointments() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy h:mma");

        return appointmentRepository.findAll().stream().map(appointment -> {
            AppointmentDTO dto = new AppointmentDTO();
            dto.setId(appointment.getId());
            dto.setDate(appointment.getAppointmentTime().format(formatter));
            dto.setDoctorId(appointment.getDoctor() != null ? appointment.getDoctor().getId() : null);
            dto.setPatientName(appointment.getPatientName());  // ✅ Include patient name
            return dto;
        }).collect(Collectors.toList());
    }

    public AppointmentDTO getAppointmentById(Long id) {
        return appointmentRepository.findById(id).map(app -> {
            AppointmentDTO dto = new AppointmentDTO();
            dto.setId(app.getId());
            dto.setDate(app.getAppointmentTime().toString());
            dto.setDoctorId(app.getDoctor() != null ? app.getDoctor().getId() : null);
            return dto;
        }).orElse(null);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
