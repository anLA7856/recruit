package com.jun;

import static org.springframework.boot.SpringApplication.run;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

/**
 * 用于 启动应用程序 启动器
 * 
 * @author jun
 * @date 2018年3月23日 : 上午10:17:27
 */
@ComponentScan(basePackages ="com.jun")
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        ConfigurableApplicationContext run = run(Application.class, args);
    }

}
