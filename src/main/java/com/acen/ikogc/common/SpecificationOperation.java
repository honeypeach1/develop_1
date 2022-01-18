package com.acen.ikogc.common;

public enum SpecificationOperation {

    EQUALS("eq")
    ,NOT_EQUALS("notEq")
    ,LIKE("like")
    ,NOT_LIKE("notLike")
    ,IN("in")
    ,NOT_IN("notIn")
    ,BETWEEN("between")
    ,GREATER_THAN("gt")
    ,GREATER_THAN_EQUAL("ge")
    ,LESS_THAN("lt")
    ,LESS_THAN_EQUAL("le");

    private String code;

    SpecificationOperation(String code) {
        this.code = code;
    }

    public static SpecificationOperation findByCode(String code) {
        for(SpecificationOperation specificationOperation : SpecificationOperation.values()) {
            if(specificationOperation.code.equals(code)) return specificationOperation;
        }
        return null;
    }

}
