package com.ashdip.hospital.service;

import com.ashdip.hospital.dto.*;
import com.ashdip.hospital.entity.*;
import com.ashdip.hospital.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientService {

    @Autowired
    private final PatientRepo patientRepo;
    @Autowired
    private final DoctorRepo doctorRepo;
    @Autowired
    private final AddressRepo addressRepo;
    @Autowired
    private final MedicineRepo medicineRepo;

    public PatientService(PatientRepo patientRepo, DoctorRepo doctorRepo, AddressRepo addressRepo, MedicineRepo medicineRepo) {
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
        this.addressRepo = addressRepo;
        this.medicineRepo = medicineRepo;
    }

    public PatientDTO savePatient(PatientDTO dto) {
        Patient patient = new Patient();

        // Basic fields
        patient.setName(dto.getName());
        patient.setPhone(dto.getPhone());
        patient.setEmail(dto.getEmail());

        // Address mapping
        if (dto.getAddress() != null) {
            Address address = new Address();
            address.setStreet(dto.getAddress().getStreet());
            address.setCity(dto.getAddress().getCity());
            address.setState(dto.getAddress().getState());
            address.setZip(dto.getAddress().getZip());
            addressRepo.save(address); // Save and link
            patient.setAddress(address);
        }

        // Doctor mapping
        if (dto.getDoctor() != null && dto.getDoctor().getId() != null) {
            Optional<Doctor> doctor = doctorRepo.findById(dto.getDoctor().getId());
            doctor.ifPresent(patient::setDoctor);
        }

        // Medicines mapping
        List<Medicine> medicines = new ArrayList<>();
        if (dto.getMedicines() != null) {
            for (MedicineDTO medDto : dto.getMedicines()) {
                if (medDto.getId() != null) {
                    medicineRepo.findById(medDto.getId()).ifPresent(medicines::add);
                }
            }
        }
        patient.setMedicines(medicines);

        // Save patient
        Patient saved = patientRepo.save(patient);
        return convertToDTO(saved);
    }

    public PatientDTO update(Long id, PatientDTO dto) {
        // 1. Check if patient exists
        Patient existingPatient = patientRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        // 2. Update basic fields
        existingPatient.setName(dto.getName());
        existingPatient.setPhone(dto.getPhone());
        existingPatient.setEmail(dto.getEmail());

        // 3. Update Address
        AddressDTO addressDTO = dto.getAddress();
        Address address = existingPatient.getAddress();  // reuse existing address object
        if (address == null) {
            address = new Address();
        }
        address.setStreet(addressDTO.getStreet());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setZip(addressDTO.getZip());
        existingPatient.setAddress(address);

        // 4. Update Doctor
        if (dto.getDoctor() != null && dto.getDoctor().getId() != null) {
            Doctor doctor = doctorRepo.findById(dto.getDoctor().getId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));
            existingPatient.setDoctor(doctor);
        } else {
            existingPatient.setDoctor(null);
        }

        // 5. Update Medicines
        if (dto.getMedicines() != null) {
            List<Medicine> medicines = dto.getMedicines().stream()
                    .map(medDto -> medicineRepo.findById(medDto.getId())
                            .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + medDto.getId())))
                    .collect(Collectors.toList());
            existingPatient.setMedicines(medicines);
        }

        // 6. Save updated patient
        Patient saved = patientRepo.save(existingPatient);

        // 7. Convert back to DTO and return
        return convertToDTO(saved);
    }


    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setName(patient.getName());
        dto.setPhone(patient.getPhone());
        dto.setEmail(patient.getEmail());

        // Address mapping
        Address address = patient.getAddress();
        if (address != null) {
            AddressDTO addressDTO = new AddressDTO();
            addressDTO.setId(address.getId());
            addressDTO.setStreet(address.getStreet());
            addressDTO.setCity(address.getCity());
            addressDTO.setState(address.getState());
            addressDTO.setZip(address.getZip());
            dto.setAddress(addressDTO);
        }

        // Doctor mapping
        Doctor doctor = patient.getDoctor();
        if (doctor != null) {
            DoctorDTO doctorDTO = new DoctorDTO();
            doctorDTO.setId(doctor.getId());
            doctorDTO.setName(doctor.getName());
            doctorDTO.setSpecialization(doctor.getSpecialization());
            dto.setDoctor(doctorDTO);
        }

        // Medicine mapping
        List<MedicineDTO> medDTOs = new ArrayList<>();
        if (patient.getMedicines() != null) {
            for (Medicine m : patient.getMedicines()) {
                MedicineDTO mDto = new MedicineDTO();
                mDto.setId(m.getId());
                mDto.setName(m.getName());
                mDto.setType(m.getType());
                medDTOs.add(mDto);
            }
        }
        dto.setMedicines(medDTOs);

        return dto;
    }
}
