package com.project.team.Permission;

/**
 * 권한 역할을 Enum으로 관리.
 * 'ROLE_OWNER'는 Travel을 생성한 원 소유자.
 * 'ROLE_EDITOR'는 일정 수정이 가능한 사용자.
 * 'ROLE_VIEWER'는 일정 조회가 가능한 (읽기 전용) 사용자.
 */
public enum PermissionRole {
    ROLE_OWNER,
    ROLE_EDITOR,
    ROLE_VIEWER;

    /**
     * 문자열이 유효한 역할인지 확인.
     */
    public static boolean isValidRole(String role) {
        for (PermissionRole r : values()) {
            if (r.name().equals(role)) {
                return true;
            }
        }
        return false;
    }
}