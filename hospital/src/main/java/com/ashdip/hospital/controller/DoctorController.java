package com.ashdip.hospital.controller;

import com.ashdip.hospital.dto.DoctorDTO;
import com.ashdip.hospital.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorController {

    @Autowired
    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping
    public DoctorDTO create(@RequestBody DoctorDTO doctorDTO) {
        return doctorService.saveDoctor(doctorDTO);
    }

    @GetMapping
    public List<DoctorDTO> all() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getById(@PathVariable Long id) {
        DoctorDTO doctorDTO = doctorService.getDoctorById(id);
        if (doctorDTO != null) {
            return ResponseEntity.ok(doctorDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorDTO> update(@PathVariable Long id, @RequestBody DoctorDTO updatedDoctor) {
        DoctorDTO updated = doctorService.updateDoctor(id, updatedDoctor);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
    }
}
