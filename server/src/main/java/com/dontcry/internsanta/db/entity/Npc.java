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
public class Npc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long npcId;
    @Column(length = 20)
    private String npcName;
    @Column(length = 500)
    private String npcUrl;
    @Column(length = 20)
    private String npcX;
    @Column(length = 20)
    private String npcY;
}
