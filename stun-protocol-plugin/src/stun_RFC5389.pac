%include binpac.pac
%include bro.pac

%extern{
	#include "events.bif.h"
%}

analyzer STUN_RFC5389 withcontext {
	connection: STUN_Conn;
	flow:       STUN_Flow;
};

connection STUN_Conn(bro_analyzer: BroAnalyzer) {
	upflow   = STUN_Flow(true);
	downflow = STUN_Flow(false);
};

%include stun-protocol.pac

flow STUN_Flow(is_orig: bool) {
	flowunit = STUN_RFC5389_PDU(is_orig) withcontext(connection, this);
};

%include stun-analyzer.pac
