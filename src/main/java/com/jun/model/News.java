package com.jun.model;

/**
 * 用于存储新闻实体。
 * 
 * @author jun
 * @date 2018年3月31日 : 下午5:34:38
 *
 */
public class News {
	private Integer id;
	private String title;
	private String content;
	private String newsLog;
	private Integer newsStatus;
	private Integer newsType;
	private Long hitCount;
	private String createTime;
	private String username;
	private String publishTime;
	private String publishName;
	private String fileName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getNewsLog() {
		return newsLog;
	}

	public void setNewsLog(String newsLog) {
		this.newsLog = newsLog;
	}

	public Integer getNewsStatus() {
		return newsStatus;
	}

	public void setNewsStatus(Integer newsStatus) {
		this.newsStatus = newsStatus;
	}

	public Integer getNewsType() {
		return newsType;
	}

	public void setNewsType(Integer newsType) {
		this.newsType = newsType;
	}

	public Long getHitCount() {
		return hitCount;
	}

	public void setHitCount(Long hitCount) {
		this.hitCount = hitCount;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPublishTime() {
		return publishTime;
	}

	public void setPublishTime(String publishTime) {
		this.publishTime = publishTime;
	}

	public String getPublishName() {
		return publishName;
	}

	public void setPublishName(String publishName) {
		this.publishName = publishName;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Override
	public String toString() {
		return "News [id=" + id + ", title=" + title + ", content=" + content + ", newsLog=" + newsLog + ", newsStatus="
				+ newsStatus + ", newsType=" + newsType + ", hitCount=" + hitCount + ", createTime=" + createTime
				+ ", username=" + username + ", publishTime=" + publishTime + ", publishName=" + publishName
				+ ", fileName=" + fileName + "]";
	}

}
