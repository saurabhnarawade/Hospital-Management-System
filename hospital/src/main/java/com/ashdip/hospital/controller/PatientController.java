package com.ashdip.hospital.controller;

import com.ashdip.hospital.dto.PatientDTO;
import com.ashdip.hospital.entity.Patient;
import com.ashdip.hospital.repository.PatientRepo;
import com.ashdip.hospital.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    @Autowired
    private PatientRepo repo;

    @Autowired
    private PatientService service;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public PatientDTO create(@RequestBody PatientDTO patient) {
        return service.savePatient(patient);
//        return repo.save(patient);
    }

    @GetMapping
    public List<Patient> all() {
        return repo.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientDTO> update(@PathVariable Long id, @RequestBody PatientDTO patientDTO) {
        PatientDTO updated = service.update(id, patientDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
