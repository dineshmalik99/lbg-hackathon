package Sample;

import com.google.cloud.spring.pubsub.core.subscriber.PubSubSubscriberTemplate;
import com.lbg.consumer.annotation.PubSubListener;
import jakarta.annotation.PostConstruct;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Component
public class PubSubListenerRegistrar {

    @Autowired
    private ApplicationContext context;

    @Autowired
    private PubSubSubscriberTemplate subscriberTemplate;

    @PostConstruct
    public void registerListeners() {
        String[] beanNames = context.getBeanDefinitionNames();

        for (String beanName : beanNames) {
            Object bean = context.getBean(beanName);
            Class<?> targetClass = AopUtils.getTargetClass(bean);

            for (Method method : targetClass.getDeclaredMethods()) {
                if (method.isAnnotationPresent(PubSubListener.class)) {
                    PubSubListener annotation = method.getAnnotation(PubSubListener.class);
                    String subscription = annotation.subscription();

                    subscriberTemplate.subscribe(subscription, message -> {
                        try {
                            String payload = message.getPubsubMessage().getData().toStringUtf8();
                            method.setAccessible(true);
                            method.invoke(bean, payload);
                            message.ack();
                        } catch (Exception e) {
                            message.nack();
                            e.printStackTrace();
                        }
                    });

                    System.out.printf("Subscribed method %s to Pub/Sub subscription '%s'%n", method.getName(), subscription);
                }
            }
        }
    }
}
