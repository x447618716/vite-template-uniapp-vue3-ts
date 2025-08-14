import { request } from '@/utils/http';
import type { BaseResponse, BaseResponsePage } from '@/services/vo/conmmon';
import type {
    ClassifyListVo,
    CollectVo,
    OrganizationListVo,
    OrgInfoDetailVo,
    PopularityListVo,
    SearchListVo,
    UnionCommentListVo,
    UnionCommentReplyListVo,
    VideoListVo
} from '@/services/vo/organization';
import type {
    AddCommentDto,
    addCommentUpvoteDto,
    CommentReplyDto,
    OrgInfoDetailDto,
    OrgSubjectListDto,
    SearchListDto,
    UnionCommentListDto,
    UnionCommentReplyListDto,
    UnionReadDto,
    VideoDetailDto
} from '@/services/dto/organization';
import type { PageDto } from '@/services/dto/conmmon';

/**
 * 专题轮播列表
 * */
export const getPopularityList = () => request.Get<BaseResponse<PopularityListVo[]>>('/union-serve/app/unionOrgInfo/getPopularityList');

/**
 * 分类列表
 * */
export const getClassifyList = () => request.Get<BaseResponse<ClassifyListVo[]>>('/union-serve/app/unionOrgInfo/getClassifyList');

/**
 * 获取组织管理专题列表
 ** */
export const getOrgSubjectList = (data: OrgSubjectListDto) =>
    request.Post<BaseResponsePage<OrganizationListVo[]>>(`/union-serve/app/unionOrgInfo/getOrgSubjectList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`, {
        type: data.type,
        sort: data.sort,
        unionInfoId: data.unionInfoId
    });

/**
 * 获取组织管理搜索列表
 * */
export const getSearchList = (data: SearchListDto) =>
    request.Post<BaseResponsePage<SearchListVo[]>>(`/union-serve/app/unionOrgInfo/getSearchList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`, {
        keyword: data.keyword
    });

/**
 * 获取最新视频列表
 * */
export const getVideoList = (data: PageDto) =>
    request.Get<BaseResponsePage<VideoListVo[]>>('/union-serve/app/unionOrgInfo/getVideoList', {
        params: data
    });

/**
 * 获取指定视频详情
 * */
export const getVideoDetail = (data: VideoDetailDto) => request.Post<BaseResponse<VideoListVo>>('/union-serve/app/unionOrgInfo/getVideoDetail', data);

/**
 * 随机推送本专题模块相关视频
 * */
export const getVideoRandom = () => request.Get<BaseResponse<VideoListVo[]>>('/union-serve/app/unionOrgInfo/getVideoRandom');

/**
 * 获取组织管理指定活动详情
 * */
export const getOrgInfoDetail = (data: OrgInfoDetailDto) =>
    request.Get<BaseResponse<OrgInfoDetailVo>>('/union-serve/app/unionOrgInfo/getOrgInfoDetail', {
        params: data
    });

/**
 * 发表评论
 * */
export const addComment = (data: AddCommentDto) => request.Post<BaseResponse<boolean>>('/union-serve/app/unionOrgInfo/addComment', data);

/**
 * 新增评论点赞
 * */
export const addCommentUpvote = (data: addCommentUpvoteDto) =>
    request.Post<BaseResponse<boolean>>('/union-serve/app/unionOrgInfo/addCommentUpvote', {
        ...data,
        moduleCode: 'union_serve',
        type: 'ORG_INFO'
    });

/**
 * 获取组织管理指定公告的评论列表
 * */
export const getUnionCommentList = (data: UnionCommentListDto) =>
    request.Post<BaseResponsePage<UnionCommentListVo[]>>(
        `/union-serve/app/unionOrgInfo/getUnionCommentList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
        {
            userId: data.userId,
            contentId: data.contentId
        }
    );

/**
 * 获取组织管理指定公告的评论的回复列表
 * */
export const getUnionCommentReplyList = (data: UnionCommentReplyListDto) =>
    request.Post<BaseResponsePage<UnionCommentReplyListVo[]>>(
        `/union-serve/app/unionOrgInfo/getUnionCommentReplyList?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
        {
            userId: data.userId,
            contentId: data.contentId,
            commentId: data.commentId
        }
    );

/**
 * 新增评论回复
 * */
export const addCommentReply = (data: CommentReplyDto) => request.Post<BaseResponse<boolean>>('/union-serve/app/unionOrgInfo/addCommentReply', data);

/**
 * 记录读数
 * */
export const saveUnionRead = (data: UnionReadDto) =>
    request.Post<BaseResponse<boolean>>('/union-serve/union-read/saveUnionRead', {
        ...data,
        moduleCode: 'ORG_INFO',
        scene: '组织管理'
    });

/**
 * 是否收藏
 * */
export const isCollect = (data: UnionReadDto) => request.Post<BaseResponse<CollectVo>>('/union-serve/union-collect/isCollect', data);

/**
 * 新增/修改收藏
 * */
export const saveOrUpdateUnionCollect = (data: UnionReadDto) =>
    request.Post<BaseResponse<boolean>>('/union-serve/union-collect/saveOrUpdateUnionCollect', data);

/**
 * 是否点赞
 * */
export const isUpvote = (data: UnionReadDto) => request.Post<BaseResponse<CollectVo>>('/union-serve/union-upvote/isUpvote', data);

/**
 * 新增/修改点赞
 * */
export const saveOrUpdateUnionUpvote = (data: UnionReadDto) => request.Post<BaseResponse<boolean>>('/union-serve/union-upvote/saveOrUpdateUnionUpvote', data);
