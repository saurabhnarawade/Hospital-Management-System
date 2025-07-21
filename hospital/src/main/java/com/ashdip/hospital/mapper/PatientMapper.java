package com.ashdip.hospital.mapper;

import com.ashdip.hospital.dto.*;
import com.ashdip.hospital.entity.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

public class PatientMapper {

    public static PatientDTO toDTO(Patient patient) {
        if (patient == null) return null;

        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setName(patient.getName());
        dto.setPhone(patient.getPhone());
        dto.setEmail(patient.getEmail());



        dto.setAddress(toAddressDTO(patient.getAddress()));
        dto.setDoctor(toDoctorDTO(patient.getDoctor()));

        if (patient.getMedicines() != null) {
            dto.setMedicines(
                    patient.getMedicines().stream()
                            .map(PatientMapper::toMedicineDTO)
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }

    public static Patient toEntity(PatientDTO dto) {
        if (dto == null) return null;

        Patient patient = new Patient();
        patient.setId(dto.getId());
        patient.setName(dto.getName());
        patient.setPhone(dto.getPhone());
        patient.setEmail(dto.getEmail());

        Address address = new Address();
        address.setId(dto.getAddress().getId());
        address.setStreet(dto.getAddress().getStreet());
        address.setCity(dto.getAddress().getCity());
        address.setState(dto.getAddress().getState());
        address.setZip(dto.getAddress().getZip());
        address.setPatient(patient);
        patient.setAddress(address);

        Doctor doctor = new Doctor();
        doctor.setId(dto.getDoctor().getId());
        patient.setDoctor(doctor);

        if (dto.getMedicines() != null) {
            List<Medicine> medicines = dto.getMedicines().stream()
                    .map(m -> {
                        Medicine medicine = new Medicine();
                        medicine.setId(m.getId());
                        return medicine;
                    })
                    .collect(Collectors.toList());
            patient.setMedicines(medicines);
        }

        return patient;
    }

    public static AddressDTO toAddressDTO(Address address) {
        if (address == null) return null;
        AddressDTO dto = new AddressDTO();
        dto.setId(address.getId());
        dto.setStreet(address.getStreet());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setZip(address.getZip());
        return dto;
    }

    public static DoctorDTO toDoctorDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setSpecialization(doctor.getSpecialization());

        // Convert appointments
        if (doctor.getAppointments() != null) {
            List<AppointmentDTO> appts = doctor.getAppointments().stream()
                    .map(appt -> {
                        AppointmentDTO a = new AppointmentDTO();
                        a.setId(appt.getId());
                        a.setDate(appt.getAppointmentTime().format(DateTimeFormatter.ofPattern("dd-MM-yyyy h:mma")));
                        a.setDoctorId(doctor.getId());
                        a.setPatientName(appt.getPatientName());
                        return a;
                    }).collect(Collectors.toList());
            dto.setAppointments(appts);
        }

        // Convert patients
        if (doctor.getPatients() != null) {
            List<PatientDTO> patientDTOs = doctor.getPatients().stream()
                    .map(p -> {
                        PatientDTO pdto = new PatientDTO();
                        pdto.setId(p.getId());
                        pdto.setName(p.getName());
                        pdto.setEmail(p.getEmail());
                        pdto.setPhone(p.getPhone());
                        return pdto;
                    }).collect(Collectors.toList());
            dto.setPatients(patientDTOs);
        }

        return dto;
    }



    public static MedicineDTO toMedicineDTO(Medicine m) {
        if (m == null) return null;
        MedicineDTO dto = new MedicineDTO();
        dto.setId(m.getId());
        dto.setName(m.getName());
        dto.setType(m.getType());
        return dto;
    }
}
