import { Test } from './test_model';
declare var jsPDF: any;

export class Test2PDF {
    constructor() {}

    getPDF(test: Test) {
        const pdf = new jsPDF();
        pdf.addFont('DidactGothic-Regular.ttf', 'DidactGothic-Regular', 'normal');
        pdf.setFont('DidactGothic-Regular');

        let height = 20;
        let textSize = 0;

        pdf.setFontSize(20);

        const testTitle = pdf.splitTextToSize(test.title, 440);
        for (let j = 0; j < testTitle.length; j++) {
          pdf.text(20, height, testTitle[j]);
          textSize = textSize + 20;
          height = height + 9;
        }

        height = height + 3;

        pdf.setFontSize(12);

        pdf.text(20, height, `Imię i nazwisko:   _______________________________________________________________________`);
        textSize = textSize + 12;

        height = height + 10;

        let points = 0;

        for (let i = 0; i < test.body.length; i++) {
          points = points + test.body[i].points;
        }

        pdf.text(20, height, `Wynik:   _______ pkt/${points} pkt`);
        textSize = textSize + 12;

        height = height + 7;

        for (let i = 0; i < test.body.length; i++) {
          height = height + 7;
          if (height + textSize >= 620) {
            pdf.addPage();
            height = 20;
            textSize = 0;
          }
          const question = test.body[i];

          pdf.setFontSize(14);

          const questionText = pdf.splitTextToSize(question.question, 425);
          for (let j = 0; j < questionText.length; j++) {
            if (j === 0) {
              questionText[j] = `${question.nr}. ` + questionText[j];
            }
            if (j === questionText.length - 1) {
              questionText[j] = questionText[j] + ` (${question.points} pkt)`;
            }
            pdf.text(20, height, questionText[j]);
            textSize = textSize + 14;
            height = height + 9;
            if (height + textSize >= 620) {
              pdf.addPage();
              height = 20;
              textSize = 0;
            }
          }

          pdf.setFontSize(12);

          if (question.type === 'pairs') {
            let first = [];
            for (let k = 0; k < question.answers.length; k++) {
              first.push(question.answers[k]['first']);
            }
            first = this.shuffle(first);

            let second = [];
            for (let k = 0; k < question.answers.length; k++) {
              second.push(question.answers[k]['second']);
            }
            second = this.shuffle(second);

            const letterStart = 65;

            for (let k = 0; k < question.answers.length; k++) {
              const firstText = pdf.splitTextToSize(first[k], 150);
              const secondText = pdf.splitTextToSize(second[k], 150);

              const letter = String.fromCharCode(letterStart + k);
              const max = Math.max(firstText.length, secondText.length);
              for (let j = 0; j < max; j++) {
                if (j === 0) {
                  if (firstText[j] !== undefined) {
                    firstText[j] = `${k + 1}. ` + firstText[j];
                  }
                  if (secondText[j] !== undefined) {
                    secondText[j] = `${letter}. ` + secondText[j];
                  }
                }
                if (firstText[j] !== undefined) {
                  pdf.text(20, height, firstText[j]);
                }
                if (secondText[j] !== undefined) {
                  pdf.text(120, height, secondText[j]);
                }
                textSize = textSize + 12;
                height = height + 7;
                if (j === max - 1) {
                  height = height + 4;
                }
                if (height + textSize >= 620) {
                  pdf.addPage();
                  height = 20;
                  textSize = 0;
                }
              }

            }

            height = height + 2;
            if (height + textSize >= 620) {
              pdf.addPage();
              height = 20;
              textSize = 0;
            }

            pdf.text(20, height, 'Miejsce na odpowiedź: ');
            textSize = textSize + 12;
            height = height + 10;
            if (height + textSize >= 620) {
              pdf.addPage();
              height = 20;
              textSize = 0;
            }

            let giveAnswer = '';
            for (let k = 0; k < question.answers.length; k++) {
              giveAnswer = giveAnswer + `${k + 1}. ______ `;
            }

            const giveAnswerText = pdf.splitTextToSize(giveAnswer, 420);
            for (let j = 0; j < giveAnswerText.length; j++) {
              pdf.text(20, height, giveAnswerText[j]);
              textSize = textSize + 12;
              height = height + 7;
              if (height + textSize >= 620) {
                pdf.addPage();
                height = 20;
                textSize = 0;
              }
            }

          } else if (question.type === 'puzzle') {
            const answers = this.shuffle(question.answers[0]['correct']);
            let puzzle = '';
            for (let k = 0; k < answers.length; k++) {
              if (k < answers.length - 1) {
                puzzle = puzzle + answers[k] + ' | ';
              } else {
                puzzle = puzzle + answers[k];
              }
            }

            let count = 0;

            const answersText = pdf.splitTextToSize(puzzle, 400);
            for (let j = 0; j < answersText.length; j++) {
              pdf.text(20, height, answersText[j]);
              textSize = textSize + 12;
              height = height + 7;
              if (height + textSize >= 620) {
                pdf.addPage();
                height = 20;
                textSize = 0;
              }
              count = count + 1;
            }

            height = height + 3;
            if (height + textSize >= 620) {
              pdf.addPage();
              height = 20;
              textSize = 0;
            }
            pdf.text(20, height, 'Miejsce na odpowiedź: ');
            textSize = textSize + 12;
            height = height + 10;
            if (height + textSize >= 620) {
              pdf.addPage();
              height = 20;
              textSize = 0;
            }
            for (let j = 0; j < count; j++) {
              pdf.text(20, height, '______________________________________________________________________________________');
              textSize = textSize + 12;
              height = height + 7;
              if (height + textSize >= 620) {
                pdf.addPage();
                height = 20;
                textSize = 0;
              }
            }

          } else if (question.type === 'gaps') {
            let text = '';
            for (let k = 0; k < question.answers.length; k++) {
              if (!question.answers[k]['is_gap']) {
                if (question.answers[k]['content'][0] === '\n') {
                  text = text + question.answers[k]['content'][0];
                } else {
                  text = text + question.answers[k]['content'][0] + ' ';
                }
              } else {
                const gapLength = question.answers[k]['content'][0].length;
                for (let m = 0; m < gapLength; m++) {
                  if (m === gapLength - 1) {
                    text = text + ' ';
                  } else {
                    text = text + '____';
                  }
                }
              }
            }
            const answerText = pdf.splitTextToSize(text, 375);
            for (let j = 0; j < answerText.length; j++) {
              pdf.text(20, height, answerText[j]);
              textSize = textSize + 12;
              height = height + 7;
              if (height + textSize >= 620) {
                pdf.addPage();
                height = 20;
                textSize = 0;
              }
            }
          } else {
            if (question.type === 'multiple-choice') {
              pdf.setFontSize(10);
              height = height - 2;
              pdf.text(20, height, '(możliwych jest kilka prawidłowych odpowiedzi)');
              textSize = textSize + 10;
              pdf.setFontSize(12);
              height = height + 9;
              if (height + textSize >= 620) {
                pdf.addPage();
                height = 20;
                textSize = 0;
              }
            }
            const letterStart = 65;
            for (let k = 0; k < question.answers.length; k++) {
              const answer = question.answers[k];
              const answerText = pdf.splitTextToSize(answer['content'], 410);
              const letter = String.fromCharCode(letterStart + k);

              for (let j = 0; j < answerText.length; j++) {
                if (j === 0) {
                  answerText[j] = `${letter}. ` + answerText[j];
                }
                pdf.text(20, height, answerText[j]);
                textSize = textSize + 12;
                height = height + 7;
                if (height + textSize >= 620) {
                  pdf.addPage();
                  height = 20;
                  textSize = 0;
                }
              }
            }
          }

        }

        pdf.save(`${test.title}.pdf`);
      }

      shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
      }

}
