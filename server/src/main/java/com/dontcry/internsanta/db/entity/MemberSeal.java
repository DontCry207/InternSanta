package com.dontcry.internsanta.db.entity;

import com.dontcry.internsanta.common.model.converter.IntegerArrayConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

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

    @Column(length = 100)
    @Convert(converter = IntegerArrayConverter.class)
    private List<Integer> memberSeals;
}
