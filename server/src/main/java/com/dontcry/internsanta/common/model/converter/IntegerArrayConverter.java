package com.dontcry.internsanta.common.model.converter;

import javax.persistence.AttributeConverter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class IntegerArrayConverter implements AttributeConverter<List<Integer>, String> {

    private static final String SPLIT_CHAR = ",";
    @Override
    public String convertToDatabaseColumn(List<Integer> attribute) {
        if(attribute == null)
            return "0,0,0,0,0,0,0,0,0,0,0,0";
        return attribute.stream().map(String::valueOf).collect(Collectors.joining(SPLIT_CHAR));
    }

    @Override
    public List<Integer> convertToEntityAttribute(String dbData) {
        return Arrays.stream(dbData.split(SPLIT_CHAR))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }
}
