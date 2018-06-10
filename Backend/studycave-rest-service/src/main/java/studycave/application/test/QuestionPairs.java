package studycave.application.test;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class QuestionPairs extends Question{
	@OneToMany(fetch = FetchType.LAZY,mappedBy="question",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<AnswerPairs> answers = new ArrayList<>();
	
	

	public QuestionPairs() {
		super();
	}

	public List<AnswerPairs> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerPairs> answers) {
		this.answers = answers;
	}
	
	public void setType() {
		this.type = "pairs";
	}
		
	
}
