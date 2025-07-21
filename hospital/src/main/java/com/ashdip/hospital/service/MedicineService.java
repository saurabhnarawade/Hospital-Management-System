package com.ashdip.hospital.service;

import com.ashdip.hospital.dto.MedicineDTO;
import com.ashdip.hospital.entity.Medicine;
import com.ashdip.hospital.mapper.PatientMapper;
import com.ashdip.hospital.repository.MedicineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class MedicineService {

    @Autowired
    private MedicineRepo medicineRepository;

    public MedicineDTO saveMedicine(MedicineDTO dto) {
        Medicine medicine = new Medicine();
        medicine.setId(dto.getId());
        medicine.setName(dto.getName());
        medicine.setType(dto.getType());
        Medicine saved = medicineRepository.save(medicine);
        return PatientMapper.toMedicineDTO(saved);
    }

    public MedicineDTO updateMedicine(Long id, MedicineDTO dto) {
        return medicineRepository.findById(id).map(existing -> {
            existing.setName(dto.getName());
            existing.setType(dto.getType());
            Medicine updated = medicineRepository.save(existing);
            return PatientMapper.toMedicineDTO(updated);
        }).orElse(null);
    }


    public List<MedicineDTO> getAllMedicines() {
        return medicineRepository.findAll().stream()
                .map(PatientMapper::toMedicineDTO)
                .collect(Collectors.toList());
    }

    public MedicineDTO getMedicineById(Long id) {
        return medicineRepository.findById(id)
                .map(PatientMapper::toMedicineDTO)
                .orElse(null);
    }

    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }
}