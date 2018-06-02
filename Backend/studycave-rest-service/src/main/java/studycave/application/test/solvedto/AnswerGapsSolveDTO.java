package studycave.application.test.solvedto;



import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import studycave.application.test.AnswerGaps;

public class AnswerGapsSolveDTO extends AnswerGaps{

    @JsonInclude(JsonInclude.Include.NON_NULL) 
	private String[] content = new String[25];
	
	@JsonProperty("is_gap")
	private boolean gap;
	
	
}
