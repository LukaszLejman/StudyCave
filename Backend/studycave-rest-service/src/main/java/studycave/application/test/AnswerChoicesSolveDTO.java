package studycave.application.test;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class AnswerChoicesSolveDTO extends AnswerChoices {
	
    @JsonIgnore
    private Boolean good;
    
    public AnswerChoicesSolveDTO() {
    	super();
    }


    
	

}
