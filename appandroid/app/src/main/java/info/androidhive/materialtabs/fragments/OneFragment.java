package info.androidhive.materialtabs.fragments;


import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;

import android.support.v7.widget.CardView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.Toast;
import info.androidhive.materialtabs.R;
import info.androidhive.materialtabs.activity.PhenixInfra;


public class OneFragment extends Fragment {

    private static final String TAG = OneFragment.class.getSimpleName();
    private Button dashButtonOnline, dashButtonOffline, dashButtonInfra;

    /** The CardView widget. */
    //@VisibleForTesting
    CardView mCardView;

    /**
     * SeekBar that changes the cornerRadius attribute for the {@link #mCardView} widget.
     */
    //@VisibleForTesting
    SeekBar mRadiusSeekBar;

    /**
     * SeekBar that changes the Elevation attribute for the {@link #mCardView} widget.
     */
    //@VisibleForTesting
    SeekBar mElevationSeekBar;

    public OneFragment() {
        // Required empty public constructor
    }


    // TODO: Rename and change types and number of parameters
    public static OneFragment newInstance() {
        OneFragment fragment = new OneFragment();
        fragment.setRetainInstance(true);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

       /*
        dashButtonInfra = (Button) getView().findViewById(R.id.dash_button_infra);
        dashButtonOffline= (Button) getView().findViewById(R.id.dash_button_offline);
        dashButtonOnline = (Button) getView().findViewById(R.id.dash_button_online);
        dashButtonInfra.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getActivity(),PhenixInfra.class));
            }
        });*/
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_one, container, false);
        dashButtonOnline = (Button) v.findViewById(R.id.dash_button_online);
        dashButtonInfra = (Button) v.findViewById(R.id.dash_button_infra);

        dashButtonInfra.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(getActivity(),PhenixInfra.class));
            }
        });
        return v;
    }


    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mCardView = (CardView) view.findViewById(R.id.cardview);

    }

}
