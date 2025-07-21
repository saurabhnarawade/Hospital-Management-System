package com.ashdip.hospital.repository;

import com.ashdip.hospital.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineRepo extends JpaRepository<Medicine,Long> {
}
