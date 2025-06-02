package Sample;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lbg.consumer.annotation.PubSubListener;
import com.lbg.consumer.model.CommunicationMessage;
import com.lbg.consumer.service.EmailService;
import com.lbg.consumer.service.PushNotificationService;
import com.lbg.consumer.service.SMSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Component
public class MessageHandlerEmail {
    private final EmailService emailService;
    @Autowired
    public MessageHandlerEmail(EmailService emailService, SMSService smsService, PushNotificationService pushService) {
        this.emailService = emailService;}

    @PubSubListener(subscription = "email-sub")
    public void handle(String receivedMessage) {
        System.out.println("Received via @PubSubListener type Email: " + receivedMessage);
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> payload = null;
        try {
             payload = mapper.readValue(receivedMessage, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            e.printStackTrace();
        }
        Map<String, Object> message = (Map<String, Object>) payload.get("message");
        String data = new String(Base64.getDecoder().decode((String) message.get("data")), StandardCharsets.UTF_8);
        try{CommunicationMessage comm = mapper.readValue(data, CommunicationMessage.class);
        emailService.sendEmail(comm);
        System.out.println("Message Processed");}
        catch (Exception e) {
            System.out.println("Error processing message: " + e.getMessage());
        }
    }
}
