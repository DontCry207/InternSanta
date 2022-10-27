package com.dontcry.internsanta.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate // 변경된 컬럼만 업데이트(patch)
public class QuestScript {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questScriptId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quest_id")
    private Quest quest;

    @Column(columnDefinition = "TINYINT", length=1)
    private int questComplete;
    @Column(length = 500)
    private String questScriptTxt;
}
