package com.dontcry.internsanta.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate // 변경된 컬럼만 업데이트(patch)
public class MemberSeal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSealId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ColumnDefault("0")
    private int memberSeal1;
    @ColumnDefault("0")
    private int memberSeal2;
    @ColumnDefault("0")
    private int memberSeal3;
    @ColumnDefault("0")
    private int memberSeal4;
    @ColumnDefault("0")
    private int memberSeal5;
    @ColumnDefault("0")
    private int memberSeal6;
    @ColumnDefault("0")
    private int memberSeal7;
    @ColumnDefault("0")
    private int memberSeal8;
    @ColumnDefault("0")
    private int memberSeal9;
    @ColumnDefault("0")
    private int memberSeal10;
    @ColumnDefault("0")
    private int memberSeal11;
    @ColumnDefault("0")
    private int memberSeal12;
}
