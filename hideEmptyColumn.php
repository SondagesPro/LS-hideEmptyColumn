<?php
/**
 * hideEmptyColumn Plugin for LimeSurvey
 * hide empty column in public question table
 *
 * @author Denis Chenu <denis@sondages.pro>
 * @copyright 2014-2022 Denis Chenu <http://sondages.pro>
 * @copyright 2014 Incidence <http://www.incidence.be/>
 * @license GPL v3
 * @version 2.0.0
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */
class hideEmptyColumn extends PluginBase {

    protected $storage = 'DbStorage';
    static protected $name = 'Hide empty column';
    static protected $description = 'Hide directly the empty column in all array question type';


    public function init() {
        $this->subscribe('beforeSurveyPage');
    }

    public function beforeSurveyPage()
    {
        if (!$this->getEvent()) {
            throw new CHttpException(403);
        }
        $oEvent = $this->event;
        $iSurveyId = $oEvent->get('surveyId');
        $assetUrl = Yii::app()->assetManager->publish(dirname(__FILE__) . '/assets');
        Yii::app()->clientScript->registerScriptFile($assetUrl . '/hideemptycolumn.js',CClientScript::POS_END);
        Yii::app()->clientScript->registerCssFile($assetUrl . '/hideemptycolumn.css');
        // When debugging or adapt javascript
        //Yii::app()->getClientScript()->registerScriptFile(Yii::app()->getConfig('publicurl')."plugins/hideEmptyColumn/assets/hideemptycolumn.js",CClientScript::POS_END);
        //Yii::app()->getClientScript()->registerScriptFile(Yii::app()->getConfig('publicurl')."plugins/hideEmptyColumn/assets/hideemptycolumn.css");
    }

}
