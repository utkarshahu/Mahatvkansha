package com.uts.mahavkansha.repository;

import com.uts.mahavkansha.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,Long> {

    boolean existsByEmail(String email);
    UserEntity findByEmail(String email);

}
