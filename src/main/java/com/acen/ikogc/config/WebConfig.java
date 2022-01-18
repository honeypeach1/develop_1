package com.acen.ikogc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

@Configuration
@EnableAsync
public class WebConfig {




    @Bean
    public TilesConfigurer tilesConfigurer () {
        final TilesConfigurer tilesConfigurer = new TilesConfigurer();

        tilesConfigurer.setDefinitions(new String[] { "/WEB-INF/**/tiles.xml" });
        tilesConfigurer.setCheckRefresh(true);
        return tilesConfigurer;
    }


    @Bean
    public TilesViewResolver tilesViewResolver() {
        TilesViewResolver tilesViewResolver = new TilesViewResolver();
        tilesViewResolver.setViewClass(TilesView.class);
        tilesViewResolver.setOrder(1);
        return tilesViewResolver;

    }
}
