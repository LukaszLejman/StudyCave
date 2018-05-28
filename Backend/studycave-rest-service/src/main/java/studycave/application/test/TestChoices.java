package studycave.application.test;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class TestChoices extends Test {
	@OneToMany(fetch = FetchType.LAZY,mappedBy="test",cascade = CascadeType.ALL)
    @JsonProperty("body")
    @JsonManagedReference
    List<QuestionChoices> questions;
	
	public List<QuestionChoices> getQuestions() {
		return questions;
	}

	public void setQuestions(List<QuestionChoices> questions) {
		this.questions = questions;
	}
}
