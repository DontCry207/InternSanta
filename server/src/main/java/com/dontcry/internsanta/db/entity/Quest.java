package com.dontcry.internsanta.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate // 변경된 컬럼만 업데이트(patch)
public class Quest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questId;

    @NotNull
    private int questChapter;

    @NotNull
    private int questCheckpoint;

    @NotNull
    @Column(length = 100)
    private String questTitle;

    @NotNull
    @Column(length = 100)
    private String questSub;

    @NotNull
    private int questNpc;
}
