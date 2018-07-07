import com.ibm.watson.developer_cloud.assistant.v1.Assistant;
import com.ibm.watson.developer_cloud.assistant.v1.model.Context;
import com.ibm.watson.developer_cloud.assistant.v1.model.InputData;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageOptions;
import com.ibm.watson.developer_cloud.assistant.v1.model.MessageResponse;
import org.junit.Ignore;
import org.junit.Test;

public class WatsonAssistantTest {
    @Ignore
    @Test
    public void sendQuestion() throws Exception {
        Assistant service = new Assistant("2018-02-16");
        service.setUsernameAndPassword("be81bea7-cd64-4716-bfa1-c4f99de778f2", "KcvZn5XuyE76");

        InputData input = new InputData.Builder("Turn on the lights").build();
        MessageOptions options = new MessageOptions.Builder("4af6bf4e-6413-4eda-96a1-0339b33137d1")
                .input(input)
                .build();
        MessageResponse response = service.message(options).execute();
        System.out.println(response);
    }

    @Ignore
    @Test
    public void multiQuestion() throws Exception {

        Assistant service = new Assistant("2018-02-16");
        service.setUsernameAndPassword("be81bea7-cd64-4716-bfa1-c4f99de778f2", "KcvZn5XuyE76");
        String workspaceId = "4af6bf4e-6413-4eda-96a1-0339b33137d1";

        Context context = null;

        // first message
        MessageOptions newMessageOptions = new MessageOptions.Builder()
                .workspaceId(workspaceId)
                .input(new InputData.Builder("Hello").build())
                .context(context)
                .build();

        MessageResponse response = service.message(newMessageOptions).execute();
        System.out.println("-----first response-----\n" + response);


        // second message
        newMessageOptions = new MessageOptions.Builder()
                .workspaceId(workspaceId)
                .input(new InputData.Builder("Turn on the lights please.").build())
                .context(response.getContext()) // output context from the first message
                .build();

        response = service.message(newMessageOptions).execute();

        System.out.println("-----second response-----\n" + response);
    }
}