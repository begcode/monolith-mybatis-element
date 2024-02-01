package com.mycompany.myapp.config;

import com.mycompany.myapp.oss.service.OssConfigService;
import com.mycompany.myapp.system.service.SmsSupplierService;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommonApplicationListener implements ApplicationListener<ApplicationReadyEvent> {

    private final SmsSupplierService smsSupplierService;

    private final OssConfigService ossConfigService;

    public CommonApplicationListener(OssConfigService ossConfigService, SmsSupplierService smsSupplierService) {
        this.smsSupplierService = smsSupplierService;
        this.ossConfigService = ossConfigService;
    }

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        ossConfigService.initPlatforms();
        smsSupplierService.initService();
    }
}
