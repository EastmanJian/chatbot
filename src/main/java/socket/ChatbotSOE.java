package socket;

import com.ibm.watson.developer_cloud.assistant.v1.Assistant;
import com.ibm.watson.developer_cloud.assistant.v1.model.Context;
import com.ibm.watson.developer_cloud.assistant.v1.model.InputData;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageOptions;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageResponse;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@ServerEndpoint("/chatbotSOE")
public class ChatbotSOE {
    private static String watsonVersion = "2018-02-16";
    private static String watsonUser = "be81bea7-cd64-4716-bfa1-c4f99de778f2";
    private static String watsonPass = "KcvZn5XuyE76";
    private static String watsonWorkspace = "37e8c13e-d485-43cf-beaf-cc645e5dbb53";

    public ChatbotSOE() {
        System.out.println("ChatbotSOE construct.. ThreadName=" + Thread.currentThread().getName());
    }

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("WebSocket connected successfully. SessionID=" + session.getId());
        try {
            session.getBasicRemote().sendText("{\"output\": {\"text\": [\"Hello there. What can I do for you?\"]}}");
        } catch (IOException e) {
            e.printStackTrace();
        }

        //init Watson Assistant service, attach to current session
        Assistant service = new Assistant(watsonVersion);
        service.setUsernameAndPassword(watsonUser, watsonPass);
        Context context = null;
        session.getUserProperties().put("waService", service);
        session.getUserProperties().put("waContext", context);
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("ChatbotSOE close....");

    }

    @OnMessage
    public void onMessage(Session session, String msg) {
        MessageOptions newMessageOptions = new MessageOptions.Builder()
                .workspaceId(watsonWorkspace)
                .input(new InputData.Builder(msg).build())
                .context((Context) session.getUserProperties().get("waContext"))
                .build();
        Assistant service = (Assistant) session.getUserProperties().get("waService");
        MessageResponse response = service.message(newMessageOptions).execute();
        try {
            session.getBasicRemote().sendText(response.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }
}
