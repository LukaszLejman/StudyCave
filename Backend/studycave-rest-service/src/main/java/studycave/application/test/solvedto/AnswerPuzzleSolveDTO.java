package studycave.application.test.solvedto;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import studycave.application.test.AnswerPuzzle;

public class AnswerPuzzleSolveDTO extends AnswerPuzzle {

	@JsonIgnore
	private String[] correct = new String[10];

	private List<String> puzzles = new ArrayList<String>();

	public AnswerPuzzleSolveDTO() {
		super();
	}

	public List<String> getPuzzles() {
		return puzzles;
	}

	public void generatePuzzles() {
		this.puzzles = new ArrayList(Arrays.asList(this.getCorrect()));
		Collections.shuffle(puzzles);
	}
}
