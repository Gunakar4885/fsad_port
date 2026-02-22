package com.connectcampus.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_details")
@Data
public class StudentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "roll_number", nullable = false, unique = true)
    private String rollNumber;

    @Column(name = "course_code", nullable = false)
    private String courseCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "current_year", nullable = false)
    private AcademicYear currentYear;

    @Column(name = "current_semester", nullable = false)
    private Integer currentSemester;

    @Column(nullable = false)
    private String section;

    @Column(name = "admission_year", nullable = false)
    private Integer admissionYear;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    public enum AcademicYear {
        FIRST, SECOND, THIRD, FOURTH
    }
}
