export interface PopularityListVo {
    /**
     * 描述
     */
    description?: string;
    /**
     * 文件路径
     */
    file_path?: string;
    /**
     * 公告id
     */
    id: number;
    /**
     * 收藏+点赞+查看总和
     */
    statistics?: number;
    /**
     * 标题
     */
    title?: string;
}

export interface ClassifyListVo {
    id: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    unionNo?: string;
    unionName: string;
    memberQuantity: number;
    sort: number;
    isShow: number;
    deleted: number;
    categoryIconUrl: string;
}

export interface OrganizationListVo {
    /**
     * 评论数
     */
    comment_count: number;
    /**
     * 创建时间
     */
    create_time: string;
    /**
     * 描述
     */
    description: string;
    /**
     * 文件路径
     */
    file_path: string;
    /**
     * 公告id
     */
    id: string;
    /**
     * 阅读数
     */
    read_count: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 分类id
     */
    union_info_id: number;
    /**
     * 点赞数
     */
    upvote_count: string;
}

export interface SearchListVo {
    /**
     * 评论数
     */
    comment_count: string;
    /**
     * 创建时间
     */
    create_time: string;
    /**
     * 描述
     */
    description: string;
    /**
     * 文件路径
     */
    file_path: string;
    /**
     * 公告id
     */
    id: string;
    /**
     * 阅读数
     */
    read_count: string;
    /**
     * 标题
     */
    title: string;
}

export interface VideoListVo {
    file_path: string;
    id: number;
    org_info_id: number;
    title: string;
}

export interface OrgInfoDetailVo {
    id: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    serialNo?: number | string;
    title: string;
    description: string;
    unionInfoId: number;
    showSwitch: number;
    commentSwitch: number;
    thematicText: string;
    publishTime?: string;
    deleted: number;
    mainVideoUrl: string;
    previewingVideoUrl: string;
    statistics: number;
}

export interface UnionCommentListVo {
    user_avatar: string;
    like_count: number;
    post_id: number;
    user_name: string;
    is_upvote: number;
    comment_id: number;
    content: string;
}

export interface UnionCommentReplyListVo {
    user_avatar: string;
    like_count: number;
    post_id: number;
    parent_id: number;
    user_name: string;
    root_id: number;
    is_upvote: number;
    comment_id: number;
    content: string;
}

export interface CollectVo {
    id: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    memberId: number;
    moduleCode: string;
    scene: string;
    collectContentId: number;
    deleted: number;
}
