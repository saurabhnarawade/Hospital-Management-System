package com.ashdip.hospital.controller;

import com.ashdip.hospital.dto.MedicineDTO;
import com.ashdip.hospital.service.MedicineService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin
public class MedicineController {

    @Autowired
    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @PostMapping
    public MedicineDTO create(@RequestBody MedicineDTO med) {
        return medicineService.saveMedicine(med);
    }

    @GetMapping
    public List<MedicineDTO> all() {
        return medicineService.getAllMedicines();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineDTO> getById(@PathVariable Long id) {
        MedicineDTO med = medicineService.getMedicineById(id);
        if (med != null) {
            return ResponseEntity.ok(med);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicineDTO> updateMedicine(@PathVariable Long id, @RequestBody MedicineDTO updatedDTO) {
        MedicineDTO updated = medicineService.updateMedicine(id, updatedDTO);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
    }
}
