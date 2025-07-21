package com.ashdip.hospital.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DoctorDTO {
    private Long id;
    private String name;
    private String specialization;
    private List<AppointmentDTO> appointments;
    private List<PatientDTO> patients;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public List<AppointmentDTO> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<AppointmentDTO> appointments) {
        this.appointments = appointments;
    }

    public List<PatientDTO> getPatients() {
        return patients;
    }

    public void setPatients(List<PatientDTO> patients) {
        this.patients = patients;
    }
}
