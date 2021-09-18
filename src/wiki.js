import styled from 'styled-components';

function Wiki() {
  return (
    <>
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, backgroundColor: 'wheat', padding:4 }}>
        Few more content which I dont know
      </div>
    </>
    <Wrapper>
      <dl>
        <div>
          <dt>A</dt>
          <dd>Andrew W.K.</dd>
          <dd>Apparat</dd>
          <dd>Arcade Fire</dd>
          <dd>At The Drive-In</dd>
          <dd>Aziz Ansari</dd>
        </div>
        <div>
          <dt>C</dt>
          <dd>Chromeo</dd>
          <dd>Common</dd>
          <dd>Converge</dd>
          <dd>Crystal Castles</dd>
          <dd>Cursive</dd>
        </div>
        <div>
          <dt>E</dt>
          <dd>Explosions In The Sky</dd>
        </div>
        <div>
          <dt>T</dt>
          <dd>Ted Leo &amp; The Pharmacists</dd>
          <dd>T-Pain</dd>
          <dd>Thrice</dd>
          <dd>TV On The Radio</dd>
          <dd>Two Gallants</dd>
        </div>
        <div>
          <dt>A</dt>
          <dd>Andrew W.K.</dd>
          <dd>Apparat</dd>
          <dd>Arcade Fire</dd>
          <dd>At The Drive-In</dd>
          <dd>Aziz Ansari</dd>
        </div>
        <div>
          <dt>C</dt>
          <dd>Chromeo</dd>
          <dd>Common</dd>
          <dd>Converge</dd>
          <dd>Crystal Castles</dd>
          <dd>Cursive</dd>
        </div>
        <div>
          <dt>E</dt>
          <dd>Explosions In The Sky</dd>
        </div>
        <div>
          <dt>T</dt>
          <dd>Ted Leo &amp; The Pharmacists</dd>
          <dd>T-Pain</dd>
          <dd>Thrice</dd>
          <dd>TV On The Radio</dd>
          <dd>Two Gallants</dd>
        </div>
        <div>
          <dt>A</dt>
          <dd>Andrew W.K.</dd>
          <dd>Apparat</dd>
          <dd>Arcade Fire</dd>
          <dd>At The Drive-In</dd>
          <dd>Aziz Ansari</dd>
        </div>
        <div>
          <dt>C</dt>
          <dd>Chromeo</dd>
          <dd>Common</dd>
          <dd>Converge</dd>
          <dd>Crystal Castles</dd>
          <dd>Cursive</dd>
        </div>
        <div>
          <dt>E</dt>
          <dd>Explosions In The Sky</dd>
        </div>
        <div>
          <dt>T</dt>
          <dd>Ted Leo &amp; The Pharmacists</dd>
          <dd>T-Pain</dd>
          <dd>Thrice</dd>
          <dd>TV On The Radio</dd>
          <dd>Two Gallants</dd>
        </div>
      </dl>
    </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;

  dl > div {
    background: #FFF;
  }

  dt {
    background: #B8C1C8;
    border-bottom: 1px solid #989EA4;
    border-top: 1px solid #717D85;
    color: #FFF;
    font: bold 18px/21px Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 2px 0 0 12px;
    position: -webkit-sticky;
    position: sticky;
    top: 32px;
  }

  dd {
    font: bold 20px/45px Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0 0 0 12px;
    white-space: nowrap;
  }

  dd + dd {
    border-top: 1px solid #CCC;
  }
`;