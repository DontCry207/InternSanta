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
public class MemberSeal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSealId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private int memberSeal1;
    private int memberSeal2;
    private int memberSeal3;
    private int memberSeal4;
    private int memberSeal5;
    private int memberSeal6;
    private int memberSeal7;
    private int memberSeal8;
    private int memberSeal9;
    private int memberSeal10;

}
