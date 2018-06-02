package studycave.application.test.verify;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class QuestionVerifyDeserializer extends JsonDeserializer<QuestionVerifyDTO> {

	@Autowired
	ObjectMapper objectMapper;

	@Override
	public QuestionVerifyDTO deserialize(com.fasterxml.jackson.core.JsonParser jsonParser,
			DeserializationContext context) throws IOException, JsonProcessingException {

		QuestionVerifyDTO question = new QuestionVerifyDTO();

		ObjectCodec oc = jsonParser.getCodec();
		JsonNode node = oc.readTree(jsonParser);
		question.setId(node.get("id").asLong());
		String type = node.get("type").textValue();
		question.setType(type);

		Iterator<JsonNode> elements = node.get("answers").elements();
		List<AnswerVerifyDTO> answers = new ArrayList<AnswerVerifyDTO>();

		while (elements.hasNext()) {
			JsonNode next = elements.next();
			((ObjectNode) next).put("type", type);
			if (type.equals("single-choice") || type.equals("multiple-choice") || type.equals("true-false")) {
				AnswerChoicesVerifyDTO answer = objectMapper.treeToValue(next, AnswerChoicesVerifyDTO.class);
				answers.add(answer);
				continue;
			}
			if (type.equals("gaps-choice")) {
				AnswerGapsVerifyDTO answer = objectMapper.treeToValue(next, AnswerGapsVerifyDTO.class);
				answers.add(answer);
				continue;
			}
			if (type.equals("puzzle")) {
				AnswerPuzzleVerifyDTO answer = objectMapper.treeToValue(next, AnswerPuzzleVerifyDTO.class);
				answers.add(answer);
				continue;
			}
			if (type.equals("pairs")) {
				AnswerPairsVerifyDTO answer = objectMapper.treeToValue(next, AnswerPairsVerifyDTO.class);
				answers.add(answer);
				continue;
			}
			// AnswerVerifyDTO answer = context.readValue(next.traverse(),
			// AnswerVerifyDTO.class);
		}
		question.setAnswers(answers);
		return question;
	}

}
