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
public class Seal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sealId;
    @Column(length = 20)
    private String sealName;
    @Column(length = 500)
    private String sealUrl;
}
