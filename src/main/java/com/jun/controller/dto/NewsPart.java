package com.jun.controller.dto;

 /**
 * 用于映射部分新闻消息
 *
 * @author jun
 * @date 2018年4月11日 : 下午11:41:38
 *
 */
public class NewsPart {
    private Integer id;
    private String title;
    private String createTime;
    private String hitCount;

     public void setId(Integer id) {
         this.id = id;
     }

     public Integer getId() {
         return id;
     }

     public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getHitCount() {
        return hitCount;
    }

    public void setHitCount(String hitCount) {
        this.hitCount = hitCount;
    }

}
