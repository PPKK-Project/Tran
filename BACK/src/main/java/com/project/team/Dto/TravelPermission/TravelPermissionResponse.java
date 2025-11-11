package com.project.team.Dto.TravelPermission;

public record TravelPermissionResponse( Long permissionId,
                                        Long userId,
                                        String userNickname,
                                        String userEmail,
                                        String role) {}
