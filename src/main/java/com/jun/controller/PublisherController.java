package com.jun.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.jun.controller.vo.RoleVo;
import com.jun.mapper.NewsMapper;
import com.jun.mapper.NewsTypeMapper;
import com.jun.mapper.PositionInfoMapper;
import com.jun.mapper.UserMapper;
import com.jun.model.News;
import com.jun.model.NewsType;
import com.jun.model.PositionInfo;
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
	
	@Autowired
	PositionInfoMapper positionInfoMapper;

	/**
	 * 通过这里进入新闻页面。
	 * 
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/view-publish-news", method = RequestMethod.GET)
	public String viewPublishNews(Model model, HttpServletRequest request,Integer id) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);

		// 加入newsType
		List<NewsType> newsTypes = newsTypeMapper.getAllNewsTypes();
		model.addAttribute("newsTypes", newsTypes);
		
		if(id != null){
			//说明是修改，加入内容。
			News news = newsMapper.getNewsById(id);
			model.addAttribute("news", news);
		}

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
			@RequestParam String newsTitle, @RequestParam String newsContent, @RequestParam("file") MultipartFile file,@RequestParam String target,@RequestParam Integer id)
			throws IllegalStateException, IOException {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);

		// 加入newsType
		List<NewsType> newsTypes = newsTypeMapper.getAllNewsTypes();
		model.addAttribute("newsTypes", newsTypes);
		String filename="";
		if(file != null){
			filename = file.getOriginalFilename();
		}
		// 先保存news

		
		
		String storeFileName = System.currentTimeMillis() + "-" + filename;
		News news = new News();
		if(id != null){
			news.setId(id);
		}
		news.setContent(newsContent);
		news.setFileName(storeFileName);
		news.setCreateTime(CommonUtil.formatDate(new Date()));
		news.setHitCount(0l);
		news.setNewsType(Integer.parseInt(newsType));
		news.setUsername(username);
		news.setTitle(newsTitle);
		if(target != null){
			newsMapper.updateNews(news);
		}else{
			newsMapper.addNewNews(news);
		}
		

		// 保存文件
		if(!filename.equals("")){
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
		}
		
		return "redirect:/publisher/view-news-list";
	}

	/**
	 * 分页获取数据
	 * 
	 * @param model
	 * @param request
	 * @param startPoint
	 * @param target
	 *            0表示上一页，1标识下一页，null标识首页即2表示首页
	 * @return
	 */
	@RequestMapping(value = "/view-news-list", method = RequestMethod.GET)
	public String viewNewsList(Model model, HttpServletRequest request, Integer nowPages, Integer target) {

		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		int start = nowPages == null ? 0 : nowPages * 20;
		int length = 20;
		int totalSize = newsMapper.getAllNewsSizeByUsername(username);
		if (target == null) {
			target = new Integer(1);// 初始值为1
		}
		if (nowPages == null) {
			nowPages = new Integer(1);
		}
		switch (target) {
		case 1:
			start = nowPages * 20 - 20;
			break;
		case 2:
			start = nowPages * 20 + 20;
		case 3:
			start = 0;
		case 4:
			start = totalSize - totalSize % 20;
			start = start == 0 ? totalSize - 20 : start;
		default:
			break;
		}
		List<News> news = newsMapper.getLimitNewsBesidesContent(start, length, username);
		model.addAttribute("list", news);
		model.addAttribute("nowPages", nowPages);
		model.addAttribute("user", user);
		model.addAttribute("totalSize", totalSize);
		model.addAttribute("startPoint", start + 1);
		int endPoint = start + length > totalSize ? totalSize : start + length;
		model.addAttribute("endPoint", endPoint);
		model.addAttribute("currentPagesSize", endPoint - start);


		// 加入newsType
		List<NewsType> newsTypes = newsTypeMapper.getAllNewsTypes();
		model.addAttribute("newsTypes", newsTypes);


		model.addAttribute("newsTypeMapper", newsTypeMapper);
		
		//nowPages,currentPagesSize,startPoint,endPoint

		return "/publisher/view-news-list";
	}
	
	/**
	 * 用于删除新闻
	 * @param model
	 * @param request
	 * @param name
	 * @param telephone
	 * @param username
	 * @return
	 */
	@RequestMapping(value = "/delete-news", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String deleteNews(Model model, HttpServletRequest request, Integer id) {
		if (!CommonUtil.checkIfNull(id)) {
			return "error,paramer not null";
		}
		newsMapper.deleteNewsById(id);
		return "ok";
	}
	
	/**
	 * 用于下载附件
	 * @param model
	 * @param request
	 * @param response
	 * @param fileName
	 * @throws Exception
	 */
	@RequestMapping(value = "/download-attachment/{fileName}", method = RequestMethod.GET)
	public void downloadAttachment(Model model, HttpServletRequest request,HttpServletResponse response,@PathVariable String fileName) throws Exception {
		 //上传文件路径
        String path = request.getServletContext().getRealPath("/attachment/");
		//String filePath = path+"pipe.bmp";注意可能每当启动一次，class下面的文件会被清空。
		String filePath = path+fileName;
		
		CommonUtil.download(fileName, filePath, request, response);
	}
	
	/**
	 * 以下是职位信息相关的业务代码
	 */
	
	/**
	 * 用于发布职位。
	 * @param model
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/view-publish-position", method = RequestMethod.GET)
	public String viewPublishPosition(Model model, HttpServletRequest request) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);

		// 加入newsType
		List<NewsType> newsTypes = newsTypeMapper.getAllNewsTypes();
		model.addAttribute("newsTypes", newsTypes);
		
		return "/publisher/view-publish-position";
	}
	
	/**
	 * 用于保存职位名称
	 * @param model
	 * @param request
	 * @param positionName
	 * @return
	 */
	@RequestMapping(value = "/save-position-name", method = RequestMethod.POST, produces = "text/html; charset=UTF-8")
	@ResponseBody
	public String savePositionName(Model model, HttpServletRequest request, String positionName) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		positionInfoMapper.addNewPostionInfo(username, positionName);
		return "ok";
		
	}
	
	@RequestMapping(value = "/view-position-list", method = RequestMethod.GET)
	public String viewPositionList(Model model, HttpServletRequest request, Integer nowPages, Integer target) {

		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		int start = nowPages == null ? 0 : nowPages * 20;
		int length = 20;
		int totalSize = positionInfoMapper.getAllSizePositionInfosByUsername(username);
		if (target == null) {
			target = new Integer(1);// 初始值为1
		}
		if (nowPages == null) {
			nowPages = new Integer(1);
		}
		switch (target) {
		case 1:
			start = nowPages * 20 - 20;
			break;
		case 2:
			start = nowPages * 20 + 20;
		case 3:
			start = 0;
		case 4:
			start = totalSize - totalSize % 20;
			start = start == 0 ? totalSize - 20 : start;
		default:
			break;
		}
		List<PositionInfo> positionInfos = positionInfoMapper.getLimitPositionInfos(username, start, length);
		model.addAttribute("list", positionInfos);
		model.addAttribute("nowPages", nowPages);
		model.addAttribute("user", user);
		model.addAttribute("totalSize", totalSize);
		model.addAttribute("startPoint", start + 1);
		int endPoint = start + length > totalSize ? totalSize : start + length;
		model.addAttribute("endPoint", endPoint);
		model.addAttribute("currentPagesSize", endPoint - start);
		
		return "/publisher/view-position-list";
	}
	
	/**
	 * 用于更改职位的状态
	 * @param model
	 * @param request
	 * @param id
	 * @param target
	 * @return
	 */
	@RequestMapping(value = "/modify-position-target", method = RequestMethod.GET)
	public String modifyPositionTarget(Model model, HttpServletRequest request,Integer id,Integer target) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userMapper.findByUserName(username);
		model.addAttribute("user", user);

		// 更改状态
		target = -target;
		positionInfoMapper.updatePositionState(target, id);
		return "redirect:/publisher/view-position-list";
	}
	
	
	
	
}
