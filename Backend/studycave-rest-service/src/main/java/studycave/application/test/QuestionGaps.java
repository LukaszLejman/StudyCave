package studycave.application.test;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;




@Entity
public class QuestionGaps extends Question {
	@OneToMany(fetch = FetchType.LAZY,mappedBy="question",cascade = CascadeType.ALL)
    @JsonManagedReference
    List<AnswerGaps> answers = new ArrayList<>();
	
	
	public QuestionGaps(Question question){
		super();
	}

	public List<AnswerGaps> getAnswers() {
		return answers;
	}

	public void setAnswers(List<AnswerGaps> answers) {
		this.answers = answers;
	}

	public void setType() {
		this.type = "gaps";
	}

}
