import React from 'react'
import './Sprint.scss'

function Sprint() {
    return (
        <div className="sprint">
            <div className="sprint__xMark">&times;</div>
            <div className="sprint__game">
                <div className="sprint__timeScore">
                    <div>20</div>
                    <div>620</div>
                </div>
                <div className="sprint__interface">
                    <div className="sprint__correctAnswer">
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                    </div>
                    <div className="sprint__combo">
                        <p>I</p>
                        <p>II</p>
                        <p>III</p>
                    </div>
                    <div className="sprint__words">
                        <audio>озвучка слов</audio>
                        <p>слово</p>
                        <p>предполагаемый перевод</p>
                    </div>
                    <div className="sprint__buttons">
                        <button>верно &#8594; </button>
                        <button>&#8592; не верно</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sprint
