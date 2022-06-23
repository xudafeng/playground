package com.xudafeng.hello;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SpringController {

	@RequestMapping("/home")
	public ModelAndView index() {
		ModelMap model = new ModelMap();
		model.addAttribute("extra", "Hi.");
		return new ModelAndView("index", model);
	}

	@RequestMapping("/api")
	public ModelAndView router(@RequestParam(value = "page", required = false, defaultValue = "index") String page) {
		return new ModelAndView(page);
	}
}
