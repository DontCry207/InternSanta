package com.dontcry.internsanta.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert // insert 시 null 값은 넣지 않음
public class Minigame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long minigameId;

    @NotNull
    private String memberNickname;

    @NotNull
    private int minigameScore;

    @NotNull
    @Column(columnDefinition = "TINYINT", length = 1)
    private int minigameType;

    @CreatedDate
    private LocalDateTime minigamePlaytime;
}
