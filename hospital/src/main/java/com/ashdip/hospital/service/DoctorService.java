package com.ashdip.hospital.service;

import com.ashdip.hospital.dto.DoctorDTO;
import com.ashdip.hospital.entity.Doctor;
import com.ashdip.hospital.mapper.PatientMapper;
import com.ashdip.hospital.repository.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepo doctorRepository;

    public DoctorDTO saveDoctor(DoctorDTO dto) {
        Doctor doctor = new Doctor();
        doctor.setId(dto.getId());
        doctor.setName(dto.getName());
        doctor.setSpecialization(dto.getSpecialization());
        Doctor saved = doctorRepository.save(doctor);
        return PatientMapper.toDoctorDTO(saved);
    }

    public DoctorDTO updateDoctor(Long id, DoctorDTO dto) {
        return doctorRepository.findById(id).map(existing -> {
            existing.setName(dto.getName());
            existing.setSpecialization(dto.getSpecialization());
            Doctor updated = doctorRepository.save(existing);
            return PatientMapper.toDoctorDTO(updated);
        }).orElse(null);
    }


    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(PatientMapper::toDoctorDTO)
                .collect(Collectors.toList());
    }

    public DoctorDTO getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .map(PatientMapper::toDoctorDTO)
                .orElse(null);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}