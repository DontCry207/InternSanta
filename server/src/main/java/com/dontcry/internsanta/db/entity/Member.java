package com.dontcry.internsanta.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate // 변경된 컬럼만 업데이트(patch)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @NotNull
    @Column(length = 100)
    private String memberEmail;

    @NotNull
    @Column(length = 20)
    private String memberPwd;

    @NotNull
    @Column(length = 20)
    private String memberNickname;

    @NotNull
    @Column(columnDefinition = "TINYINT", length=1)
    private int memberGender;

    @ColumnDefault("0")
    private int memberCoin;

    @ColumnDefault("0")
    private int memberTicket;

    @ColumnDefault("'url'")
    @Column(length = 500)
    private String memberTop;

    @ColumnDefault("'url'")
    @Column(length = 500)
    private String memberBottom;

    @ColumnDefault("0")
    private int memberPet;

    @ColumnDefault("0")
    private int memberChapter;

    @ColumnDefault("0")
    private int memberCheckpoint;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_seal_id")
    MemberSeal memberSeal;

    public void updateMemberCoin(int memberCoin) {
        this.memberCoin += memberCoin;
    };
    public void updateMemberPet(int memberPet) {
        this.memberPet = memberPet;
    };
    public void updateMemberProgress(int memberChapter, int memberCheckpoint) {
        this.memberChapter = memberChapter;
        this.memberCheckpoint = memberCheckpoint;
    }

    public void updateMemberTicket() { this.memberTicket++; }
    public void updateMemberTop(String memberTop) { this.memberTop = memberTop; }
}
