package com.dontcry.internsanta.api.service;

import com.dontcry.internsanta.db.entity.MemberSeal;
import com.dontcry.internsanta.db.entity.Seal;

public interface SealService {

    void updateSeal(MemberSeal memberSeal, Seal seal);

    Seal getSeal();
}
