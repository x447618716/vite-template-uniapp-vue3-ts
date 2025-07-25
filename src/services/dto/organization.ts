import { PageDto } from '@/services/dto/conmmon';

/**
 * 获取组织管理专题列表DTO
 * */
export interface OrgSubjectListDto extends PageDto {
    /**
     * 排序方式：ASC-升序 DESC-降序
     */
    sort: string;
    /**
     * 类型：1-按时间排序 2-按阅读量排序
     */
    type: number;
    /**
     * 分类id
     */
    unionInfoId: number;
}

/**
 * 获取组织管理搜索列表DTO
 * */
export interface SearchListDto extends PageDto {
    keyword?: string;
}

/**
 * 获取指定视频详情DTO
 * */
export interface VideoDetailDto {
    orgInfoFileId: string;
    contentId: string;
}

/**
 * 获取组织管理指定活动详情DTO
 * */
export interface OrgInfoDetailDto {
    orgInfoId: number;
}

/**
 * 发表评论DTO
 */
export interface AddCommentDto {
    /**
     * 评论ID
     */
    commentId?: number;
    /**
     * 内容
     */
    content?: string;
    /**
     * 创建时间
     */
    createdAt?: string;
    /**
     * 点赞数/喜欢
     */
    likeCount?: number;
    /**
     * 父Id
     */
    parentId?: number;
    /**
     * 帖子Id
     */
    postId?: number;
    /**
     * 根评论ID
     */
    rootId?: number;
    /**
     * 状态（0-正常 1-删除 2-隐藏）
     */
    status?: number;
    /**
     * 类型评论：BIRTHDAY-生日祝福 BENEFIT:福利 FESTIVAL:节日问候 HEIP:困难帮扶 MEDICAL：医疗互助 RETIREMENT:退休慰问
     * ORG_INFO-组织管理,OVERVIEW-工会概况,DATUM_OPEN-数据公开,RECRUIT_INFO-招聘信息,MENTAL_HEALTH-心理健康,LECTURE_INFO讲座信息,WORKERS_CONGRESS-职代会,INNOVATE_STUDIO-创新工作室
     */
    type?: string;
    /**
     * 修改时间
     */
    updatedAt?: string;
    /**
     * 用户头像
     */
    userAvatar?: string;
    /**
     * 用户Id
     */
    userId?: number;
    /**
     * 用户姓名
     */
    userName?: string;
    [property: string]: any;
}

/**
 * 新增评论点赞DTO
 * */
export interface addCommentUpvoteDto {
    userId: number;
    commentId: number;
    contentId: number;
}

/**
 * 获取组织管理指定公告的评论列表dto
 * */
export interface UnionCommentListDto extends PageDto {
    userId: number;
    contentId: number;
}

/**
 * 获取组织管理指定公告的评论的回复列表Dto
 * */
export interface UnionCommentReplyListDto extends PageDto {
    userId: number;
    contentId: number;
    commentId: number;
}

/**
 * 新增评论回复dto
 */
export interface CommentReplyDto {
    /**
     * 评论ID
     */
    commentId?: number;
    /**
     * 内容
     */
    content?: string;
    /**
     * 创建时间
     */
    createdAt?: string;
    /**
     * 点赞数/喜欢
     */
    likeCount?: number;
    /**
     * 父Id
     */
    parentId?: number;
    /**
     * 帖子Id
     */
    postId?: number;
    /**
     * 根评论ID
     */
    rootId?: number;
    /**
     * 状态（0-正常 1-删除 2-隐藏）
     */
    status?: number;
    /**
     * 类型评论：BIRTHDAY-生日祝福 BENEFIT:福利 FESTIVAL:节日问候 HEIP:困难帮扶 MEDICAL：医疗互助 RETIREMENT:退休慰问
     * ORG_INFO-组织管理,OVERVIEW-工会概况,DATUM_OPEN-数据公开,RECRUIT_INFO-招聘信息,MENTAL_HEALTH-心理健康,LECTURE_INFO讲座信息,WORKERS_CONGRESS-职代会,INNOVATE_STUDIO-创新工作室
     */
    type?: string;
    /**
     * 修改时间
     */
    updatedAt?: string;
    /**
     * 用户头像
     */
    userAvatar?: string;
    /**
     * 用户Id
     */
    userId?: number;
    /**
     * 用户姓名
     */
    userName?: string;
    [property: string]: any;
}

/**
 * 记录读数
 * */
export interface UnionReadDto {
    userId: string;
    moduleCode: string;
    scene: string;
    contentId: number;
}
