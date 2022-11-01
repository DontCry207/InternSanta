package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.Seal;
import org.springframework.stereotype.Service;

@Service
public interface SealService {
    void updateSeal(Long memberId);

    Seal getSeal();
}
