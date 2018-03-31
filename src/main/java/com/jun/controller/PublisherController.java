package com.jun.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.mapper.NewsMapper;
import com.jun.mapper.NewsTypeMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.News;
import com.jun.model.NewsType;
import com.jun.model.User;
import com.jun.utils.CommonUtil;

/**
 * 主要用于给publisher进行相关的操作 例如新闻发布与修改 报考信息发布与修改。
 * 
 * @author jun
 * @date 2018年3月31日 : 下午3:56:45
 *
 */
@Controller
@RequestMapping("/publisher")
@EnableWebMvc
@Transactional
public class PublisherController {

	@Autowired
	UserMapper userMapper;

	@Autowired
	NewsTypeMapper newsTypeMapper;

	@Autowired
	NewsMapper newsMapper;

	/**
	 * 通过这里进入新闻页面。
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/view-publish-news", method = RequestMethod.GET)
	public String viewPublishNews(Model model, HttpServletRequest request) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);

		// 加入newsType
		List<NewsType> newsTypes = newsTypeMapper.getAllNewsTypes();
		model.addAttribute("newsTypes", newsTypes);

		return "/publisher/view-publish-news";
	}

	/**
	 * 用于保存操作，通过传过来，是否有newsId来判断。 可以是修改保存，也可以是新建，通过是否有newsId来判断
	 * 
	 * @param model
	 * @param request
	 * @return
	 * @throws IOException
	 * @throws IllegalStateException
	 */
	@RequestMapping(value = "/save-news", method = RequestMethod.POST)
	public String saveNews(Model model, HttpServletRequest request, @RequestParam String newsType,
			@RequestParam String newsTitle, @RequestParam String newsContent, @RequestParam("file") MultipartFile file)
			throws IllegalStateException, IOException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);

		// 加入newsType
		List<NewsType> newsTypes = newsTypeMapper.getAllNewsTypes();
		model.addAttribute("newsTypes", newsTypes);

		// 先保存news
		String filename = file.getOriginalFilename();
		String storeFileName = System.currentTimeMillis() + "-" + filename;
		News news = new News();
		news.setContent(newsContent);
		news.setFileName(storeFileName);
		news.setCreateTime(CommonUtil.formatDate(new Date()));
		news.setHitCount(0l);
		news.setNewsType(Integer.parseInt(newsType));
		news.setUsername(username);
		news.setTitle(newsTitle);
		newsMapper.addNewNews(news);

		// 保存文件

		// 上传文件路径
		String path = request.getServletContext().getRealPath("/attachment/");
		// 上传文件名

		File filepath = new File(path, storeFileName);
		// 判断路径是否存在，如果不存在就创建一个
		if (!filepath.getParentFile().exists()) {
			filepath.getParentFile().mkdirs();
		}
		// 将上传文件保存到一个目标文件当中
		file.transferTo(new File(path + File.separator + filename));
		return "redirect:/publisher/view-news-list";
	}

	/**
	 * 分页获取数据
	 * 
	 * @param model
	 * @param request
	 * @param start
	 * @param target
	 *            0表示上一页，1标识下一页，null标识首页即2表示首页
	 * @return
	 */
	@RequestMapping(value = "/view-news-list", method = RequestMethod.GET)
	public String viewNewsList(Model model, HttpServletRequest request, Integer start, Integer target) {

		if (start == null) {
			start = 0;
		}
		// 默认一页20个。
		Integer length = 20;
		if (target == null) {
			target = 2;
		}

		// 判断上一页，下一页
		switch (target) {
			case 0:
				start = start - 20;
				break;
			case 1:
				start = start + 20;
				break;
		}

		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);

		// 加入newsType
		List<NewsType> newsTypes = newsTypeMapper.getAllNewsTypes();
		model.addAttribute("newsTypes", newsTypes);

		List<News> news = newsMapper.getLimitNewsBesidesContent(start, length, username);

		model.addAttribute("news", news);

		model.addAttribute("newsTypeMapper", newsTypeMapper);
		
		return "/publisher/view-news-list";
	}

}
